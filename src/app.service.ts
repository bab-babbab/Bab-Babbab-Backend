import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
      }
      console.log('db 연결됨');
    } catch (error) {
      console.error('db 연결 실패', error);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
