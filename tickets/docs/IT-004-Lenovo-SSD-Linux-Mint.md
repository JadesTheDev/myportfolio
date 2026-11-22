# IT-004 — Storage Replacement and Linux Workstation Deployment
**Project:** Lenovo IdeaCentre 510A-15ICB / Penguin-Master  
**Category:** Endpoint Hardware / Operating Systems  
**Status:** Resolved — original drive replacement and OS installation  
**Work period:** November 16–19, 2026  
**Prepared by:** Jade Powell

## 1. Incident / Service Request
The existing Lenovo desktop had a slow or deteriorating hard-disk-based configuration. The project goal was to replace its storage with a solid-state drive and establish a usable Linux development workstation. The user also wanted to learn and document each hardware and software step.

## 2. Device and Configuration
| Component | Verified detail |
|---|---|
| System | Lenovo IdeaCentre 510A-15ICB |
| System board | Lenovo 36EB |
| Replacement storage | PNY CS900 500 GB SATA SSD |
| Operating system | Linux Mint 22.3 |
| Workstation hostname | penguin-master |
| Boot configuration | UEFI; installer USB used to deploy the OS |

Hardware specifications beyond the entries above are intentionally omitted until independently verified. Passwords, recovery secrets, serial numbers, and private network details are not included.

## 3. Scope and Objectives
- Evaluate the existing storage bottleneck and select a compatible replacement.
- Perform a safe physical SSD installation.
- Prepare bootable installation media.
- Install Linux Mint on the new drive.
- Confirm the system boots from the internal SSD independently of the USB installer.
- Establish the desktop as an ongoing Linux development environment.

## 4. Work Performed
1. Identified the Lenovo model, storage connections, and compatible SATA replacement.
2. Selected and obtained a **PNY CS900 500 GB SATA SSD**.
3. Opened the desktop and performed the physical drive replacement.
4. Connected the SATA data cable and SATA power connection; addressed chassis/front-panel connections during reassembly.
5. Created a bootable Linux Mint installer using **Rufus**.
6. Entered the machine's firmware/boot environment and worked through UEFI/GRUB startup and disk detection.
7. Installed **Linux Mint 22.3** on the SSD.
8. Removed the installer USB and confirmed Linux Mint booted from the newly installed SSD.
9. Continued workstation configuration, including setting the hostname to **penguin-master** and setting up development applications.

## 5. Troubleshooting and Technical Concepts Practiced
- Distinguishing a SATA **data cable** from a SATA **power connector**.
- Installing a 2.5-inch SSD in a desktop chassis.
- Recognizing the distinction between firmware boot selection (UEFI), the Linux bootloader (GRUB), and the installed operating system.
- Identifying the intended installation disk before OS deployment.
- Verifying successful internal-disk boot without dependence on removable media.
- Understanding the difference between a Linux **hostname** (computer name) and **username** (login account).

## 6. Validation and Outcome
**Verified results:**
- New SSD physically installed and recognized.
- Linux Mint 22.3 installed.
- System booted successfully with the USB installer removed.
- The workstation was subsequently in active use under the hostname **penguin-master**.

**Resolution:** Original hardware/OS deployment request completed.

**Scope note:** Later login/password and workstation-configuration troubleshooting are separate follow-on support activities. This ticket does not claim that all later Linux issues were eliminated, nor does it claim benchmarked speed improvements without measured results.

## 7. Skills Demonstrated
Endpoint hardware servicing; storage compatibility; SATA installation; bootable-media preparation; UEFI/GRUB troubleshooting; Linux installation; operating system verification; end-user documentation.

## 8. Future Enhancements / Follow-up
- Add before-and-after storage performance measurements if available.
- Capture redacted configuration and verification screenshots.
- Record a complete non-sensitive hardware inventory.
- Add related follow-on tickets for configuration or authentication issues if appropriate.

---
**Document type:** Technical service ticket / work report  
**Record:** IT-004  
**Portfolio:** https://jadesthedev.github.io/myportfolio/tickets/  
**Last reviewed:** November 21, 2026
