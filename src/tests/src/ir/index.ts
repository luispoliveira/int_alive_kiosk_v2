/**
 * https://www.digikey.pt/en/maker/blogs/2021/how-to-send-and-receive-ir-signals-with-a-raspberry-pi
 * sudo nano /boot/config.txt
 *  dtoverlay=gpio-ir,gpio_pin=17
 * sudo reboot now
 * sudo apt update
 * sudo apt install ir-keytable
 * TEST IR
 * sudo ir-keytable -c -p all -t
 * sudo apt install lirc
 * sudo nano /etc/lirc/lirc_options.conf
 *   driver = default
 *   device = /dev/lirc0
 * sudo systemctl stop lircd.service
 * sudo mode2 -d /dev/lirc0
 * irrecord
 *  NOTA: ser der segfault, instalar o pacote liblircclient-dev
 * sudo mv <<name_of_your_config_file>> /etc/lirc/lircd.conf.d/
 * irsend list "" ""
 * sudo irw
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const lirc = require('lirc-client')({
  path: '/var/run/lirc/lircd',
});

lirc.on('connect', () => {
  lirc.send('VERSION').then((res: any) => {
    console.log('LIRC Version', res);
  });
});

lirc.on('receive', function (remote: any, button: any, repeat: any) {
  console.log('button ' + button + ' on remote ' + remote + ' was pressed!');
});
