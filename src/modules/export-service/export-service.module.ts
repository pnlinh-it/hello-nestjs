import { Module } from '@nestjs/common';
import { ExportServiceService } from './export-service.service';

@Module({
  // To export ExportServiceService, it must be a part of ExportServiceModule
  // So we need to make it become a provider of ExportServiceModule
  providers: [ExportServiceService],
  exports: [ExportServiceService],
})
export class ExportServiceModule {}
