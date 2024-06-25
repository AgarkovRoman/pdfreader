import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as pdfParse from 'pdf-parse';

@Controller('pdf')
export class PdfController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPdf(@UploadedFile() file: any): Promise<string> {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const dataBuffer = file.buffer;
    const data = await pdfParse(dataBuffer);

    return data.text;
  }
}
