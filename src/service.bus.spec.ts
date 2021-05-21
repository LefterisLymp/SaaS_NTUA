import { Test, TestingModule } from '@nestjs/testing';
import { ServiceBus } from './service.bus';
import { AppService } from './app.service';

describe('ServiceBus', () => {
  let serviceBus: ServiceBus;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceBus],
      providers: [AppService],
    }).compile();

    serviceBus = app.get<ServiceBus>(ServiceBus);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceBus.getHello()).toBe('Hello World!');
    });
  });
});
