import { LedInterface } from 'alive-kiosk/build/src/shared/domain/interfaces/led.interface';
import { sleep } from 'alive-kiosk/build/src/shared/utils/sleep';
import { Server } from 'socket.io';
import { StripLedModel } from './models/strip-led.model';

const io = new Server(3000);

const stripLeds: StripLedModel[] = [];

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('new-strip', async (arg: LedInterface) => {
    const stripLed = new StripLedModel(arg);
    console.log(
      '🚀 ~ file: index.ts ~ line 14 ~ socket.on ~ stripLed',
      stripLed,
    );
    stripLeds.push(stripLed);
    stripLed.turnAllOn(0xffffff);
    await sleep(1000);
    stripLed.turnAllOff();
  });

  socket.on(
    'on',
    (arg: { gpioPin: number; ledNumber: number; color: number }) => {
      console.log('on', arg);
      stripLeds
        .find((stripLed) => stripLed.gpiPin === arg.gpioPin)
        ?.turnLedOn(arg.ledNumber, arg.color);
    },
  );

  socket.on('off', (arg: { gpioPin: number; ledNumber: number }) => {
    console.log('off', arg);

    stripLeds
      .find((stripLed) => stripLed.gpiPin === arg.gpioPin)
      ?.turnLedOff(arg.ledNumber);
  });

  socket.on('allOn', (arg: { gpioPin: number; color: number }) => {
    console.log('allOn', arg);
    stripLeds
      .find((stripLed) => stripLed.gpiPin === arg.gpioPin)
      ?.turnAllOn(arg.color);
  });

  socket.on('allOff', (arg: { gpioPin: number }) => {
    console.log('allOff', arg);
    stripLeds.find((stripLed) => stripLed.gpiPin === arg.gpioPin)?.turnAllOff();
  });

  socket.on(
    'intervalOn',
    (arg: { gpioPin: number; from: number; to: number; color: number }) => {
      console.log('intervalOn', arg);
      stripLeds
        .find((stripLed) => stripLed.gpiPin === arg.gpioPin)
        ?.turnIntervalOn(arg.from, arg.to, arg.color);
    },
  );

  socket.on(
    'intervalOff',
    (arg: { gpioPin: number; from: number; to: number }) => {
      console.log('intervalOff', arg);
      stripLeds
        .find((stripLed) => stripLed.gpiPin === arg.gpioPin)
        ?.turnIntervalOff(arg.from, arg.to);
    },
  );

  socket.on('disconnect', () => {
    console.log('a user disconnected');
    stripLeds.map((stripLed) => stripLed.finalize());
    stripLeds.splice(0, stripLeds.length);
  });
});
