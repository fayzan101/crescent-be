import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    const memoryUsage = process.memoryUsage();
    const uptimeSeconds = process.uptime();

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      process: {
        pid: process.pid,
        uptimeSeconds,
        nodeVersion: process.version,
        memory: {
          rssBytes: memoryUsage.rss,
          heapTotalBytes: memoryUsage.heapTotal,
          heapUsedBytes: memoryUsage.heapUsed,
          externalBytes: memoryUsage.external,
        },
      },
      environment: {
        nodeEnv: process.env.NODE_ENV ?? null,
        port: process.env.PORT ?? 3000,
      },
    };
  }
}

