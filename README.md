# OpenCAM
A lightweight alternative to NZXT's [CAM](https://www.nzxt.com/camapp) software
for Kraken devices.

## Summary
Just a small program meant to replace NZXT CAM for controlling your
Kraken x31/x41/xWhatever, because CAM is quite buggy and you can never tell
whether it's going to crash and let your processor heat up.

## Installation
No easy installation just yet. You can clone it and run
`electron-forge package`, provided you have [Electron Forge](https://electronforge.io/) and a few other prerequisites.

It also requires you to replace the Kraken driver with a LibUSB driver, which
you can do with [Zadig](http://zadig.akeo.ie/).

More and better instructions will come eventually.

## Features
This program is still in early development, so don't expect too many features
or stability just yet. However, it *shouldn't* crash at the drop of a hat
like CAM.

Current feature list:
- Fan speed as reported by Kraken
- Pump speed as reported by Kraken
- Liquid temperature (in degrees Celsius) as reported by Kraken
- CPU temperature as reported by [Core Temp](https://www.alcpu.com/CoreTemp/)
- Manual setting of fan and pump speed, as a percentage from 30% to 100% of
  max speed.

## Screenshot
OpenCAM running on Windows 10:

![](https://i.imgur.com/sA6ZYig.png)
