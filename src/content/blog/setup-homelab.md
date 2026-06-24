---
title: "How i set up my homelab with 3 nodes"
description: "Doing my homelab with 3 nodes, using Proxmox and other services"
publishDate: 2026-06-25
tags: ["Proxmox", "Computer Networking"]
draft: false
---

# How i set up my homelab with 3 nodes

Hello, it just my simple blog writing about how i get started doing my best about homelab.

---

## The Architecture: Why Three ?

Building a cluster with three nodes is actually the "magic number" for Proxmox High Availability.


 Voting system to prevent data corruption. It like your brain have 3 personalities but merging into one, but they have same thinking performance. One died => you still remember everything with others 2.

The cluster uses Corosync for synchronization, which requires incredibly stable, low-latency communication. All three nodes are hardwired to an unmanaged gigabit switch via Ethernet cables, we would never use Wi-Fi here.

<img
  src="/images/topology.png"
  alt="Topology Diagram"
  loading="lazy"
  decoding="async"
/>

## Busting the "Supercomputer" Myth

It is a common misconception that clustering machines fuses their CPUs and RAM into one giant resource pool. Instead of sharing hardware microscopically, the Proxmox cluster shares workloads, management (a single web dashboard), and failover resilience.

I fall in that mistake too, first i tryna connect all 3 to make it into one but realistically that kinda impossible because just think about how they gonna communication at CPU speed through LAN?



## Defeating Laptop Power Management

Laptop có 1 vấn đề là màn hình, khi gập lid nó thì nó sẽ suspend. Nên tôi cần tắt nó đi, khá cơ bản vào `/etc/systemd/logind.conf` sau đó thêm cái dòng

```
HandleLidSwitch=ignore
HandleLidSwitchExternalPower=ignore
HandleLidSwitchDocked=ignore
```

Rồi update nó lại là xong. 

Đối với phần tắt màn thì đây là approach tôi chọn do LLM đề xuất:
Trong `/etc/default/grub`: 
```
GRUB_CMDLINE_LINUX_DEFAULT="quiet consoleblank=60 console=tty0 console=ttyS0,115200 "
```

Sẽ có 2 thứ cần chú ý `consoleblank=60` sẽ tắt màn sau 60 giây khi không tác động và `console=tty0 console=ttyS0,115200` để tôi dùng Xterm.js cho copy paste trên terminal tiện hơn là NoVNC mặc định

## One Laptop Failed to Update Time

Let name it `laptop1`. I get it from my cousin, `laptop1` experienced a physical hardware failure where its internal **CMOS battery died**.

Every time `laptop1` loses power, reboots, or undergoes maintenance, its physical hardware clock completely resets to a default manufacturer baseline date.
 Proxmox uses a cluster messaging layer (**Corosync**) to maintain quorum and track node states. Corosync requires strict time synchronization across all nodes. If `laptop1` boots up with a clock that drifts from the rest of the cluster by even a few seconds, cluster communication breaks immediately, causing the node to isolate or fence itself.

To bypass this hardware limitation permanently, the system time synchronization service (`systemd-timesyncd`) must be explicitly forced to aggressively pull the correct time from public network time servers immediately upon network initialization during the boot sequence.

### Solution

#### Step 1: Edit the Time Sync Configuration

Open the network time synchronization configuration file using the `nano` text editor:

```bash
nano /etc/systemd/timesyncd.conf
```

Locate the line containing `#NTP=` or `NTP=`. Strip away the comment symbol (`#`) if present and configure it to target fallback public upstream NTP servers (such as Google's):

```text
[Time]
NTP=time.google.com
FallbackNTP=pool.ntp.org
```

Save and exit the file (**Ctrl + O**, **Enter**, then **Ctrl + X**).

#### Step 2: Manually Jump-Start the Clock

Because secure repository handshakes, SSL validations, and initial network sync daemons require a somewhat accurate clock to authenticate, force-set the date manually right now close to the current time:

```bash
date -s "2026-06-25 11:40:00"
```

*(Verify your clock updated instantly by typing `date` right after).*

#### Step 3: Install Core Network Time Tools

With an accurate manual time window established, your internet connections to standard repositories will function without certificate validation errors. Install the missing time synchronization tools:

```bash
apt-get update && apt-get install -y systemd-timesyncd
```

#### Step 4: Configure Aggressive Boot-Blocking

To prevent Proxmox from loading heavy cluster services *before* the time is corrected, configure `systemd` to freeze the boot sequence until the network interface is active and a successful handshake is locked with the NTP server.

1. Tell systemd to rebuild its database of backend definitions:
```bash
systemctl daemon-reload
```


2. Enable and lock the systemd-time services to activate automatically on every single boot sequence:
```bash
systemctl enable systemd-timesyncd
systemctl enable systemd-time-wait-sync.service
```


3. Start the engine right now to ensure everything runs perfectly:
```bash
systemctl start systemd-timesyncd
```

To verify that `laptop1` is safely protected against future hard reboots, run the following sync status check:

```bash
timedatectl status
```

Ensure your terminal output matches these specific parameters:

* **System clock synchronized:** `yes`
* **NTP service:** `active`

### **Caution**
**Most of this solution part written by LLM, but it actually work. I don't know why but as long as it fine i'm cool with it**

## The CPU Generational Gap

The PC, the 4th-Gen Haswell laptop, and the 3rd-Gen Ivy Bridge laptop all possess different physical CPU instruction sets.

If a Virtual Machine (VM) is created using the default "Host" processor type, it will crash instantly if live-migrated to a machine with a different CPU.
 
=> All floating VMs have their Processor Type changed to generic baselines like `x86-64-v2-AES` or `kvm64`.



### 3. Storage & Replication

Laptops lack the 10Gbps networking required for enterprise distributed storage like Ceph.

* Instead, the cluster utilizes local storage (ZFS or LVM-Thin) on each node.


* High Availability is achieved via **ZFS Replication**, which syncs VM snapshots across the standard 1Gbps network.



## Claude Code 

Tạo 1 VM với OS là Ubuntu Server, cho khoảng 8gb ram

PC của tôi xử dụng Intel(R) Xeon(R) CPU E5-2686 v4. Tôi chia trước mắt là 8 nhân để thử nghiệm xem có vấn đề gì với CPU khi khoảng 3 user sử dụng claude code trên cùng VM không

Sau đó tôi cài đặt Tailscale trên VM này để ssh vào. Căn bản là sử dụng khá 

---

## Access SSH

### Wireguard (Failed)
Because the homelab is physically located in Vietnam, routing remote SSH traffic out to international cloud relays (like Cloudflare or Tailscale) introduces unnecessary latency.

To achieve wire-speed, 0ms overhead connections directly to the lab, a **WireGuard VPN** was deployed.

 WireGuard operates over UDP and silently drops unauthenticated packets, meaning international botnets scanning for open ports will see the IP as completely dead.


=> Viettel (my ISP) rotate public IPv4 with no rules so basically this was really a big issue. I could use Cloudflare Tunnel or Amazon Route 53 but that adding unnecessary costs. Also they don't allow to use other DNS like DuckDNS so that why



By leaning into the raw power of the PC and utilizing the built-in battery redundancy of the laptops, this 3-node cluster transforms spare hardware into an enterprise-grade, highly available playground!

### Tailscale
So i use Tailscale, it basic, easy to setup. Everything went smoothly but some how (or i too lazy to make a simple search). I have to set this to its work, my old Tailscale pointed to an old DNS from interface `wlan0` make everytime i run `sudo tailscale up` i lost Internet connection because that interface is no longer exist. 

To fix it, run this commmand:
```
sudo tailscale set --accept-routes=false --accept-dns=false
```

Simply it remove the DNS. Then it works

## Summary
Tôi rất cảm ơn những giảng viên trước đó đã nghiêm khắc với tôi trong việc học mạng máy tính. Nếu không thì blog này sẽ không bao giờ có thể hoàn thành
Shout out cho anh Sơn vì đã đưa cho tôi idea ban đầu về các nối các "nodes" lại với nhau thông qua chia IP và Subnet cơ bản.

Những gì tôi học được hôm nay có thể là một phần nhỏ kiến thức của các bạn, nhưng hành trình và trải nghiệm là một thứ tôi không thể nào quên. Homelab vừa là một thú vui nhưng cũng là công việc thực tế, nó giúp tôi giữ lửa nghề và thay thế các nghiệp vụ trong phát triển website đã quá nhàm chán, truyền thống, cổ điển bằng một thứ liên quan tới hạ tầng.

Khi bạn kiểm soát được gần như là từ đầu đến cuối của một thứ gì đó có thể tinkering, nó mở ra vô vàn cơ hội để bạn có thể thực hiện nhiều dự án khác nhau, học hỏi các khía cạnh còn thiếu trong SWE (Software Engineering) mà hiếm có trường lớp nào có thể dạy được.

Cảm ơn mọi người đã đi đến đây, chúc mọi người thành công trong công việc.