import { Controller, Get, Header } from '@nestjs/common';
import * as packageJson from '../../package.json';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @Header('Content-Type', 'application/json')
  @Header('X-Powered-By', 'Node.js')
  @Header('Cache-Control', 'no-cache')
  @Header('Connection', 'keep-alive')
  @Header('Date', new Date().toUTCString())
  @ApiOperation({ summary: 'Health Check', description: 'Returns the application health status and version information.' })
    healthCheck() {
        const version = packageJson.version;
        return { version: version };
    }
}
