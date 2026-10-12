import { createApiError } from '@/shared/services/http/api-error';
import { http } from './http/http-service';

export interface FileDownloadPayload {
  url?: string;
  fileUrl?: string;
  fileName?: string;
  filename?: string;
  contentType?: string;
  mimeType?: string;
  base64?: string;
  data?: string;
}

export type UnknownDownloadData = string | FileDownloadPayload | Record<string, unknown>;

export interface DownloadOptions {
  defaultFileName: string;
}

const isProbablyUrl = (value: string): boolean => {
  return (
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('/')
  );
};

const stripDataUrlPrefix = (value: string): string => {
  const idx = value.indexOf('base64,');
  return idx >= 0 ? value.slice(idx + 'base64,'.length) : value;
};

const downloadByUrl = (url: string): void => {
  window.open(url, '_blank');
};

const downloadBase64AsFile = (
  base64: string,
  fileName: string,
  contentType = 'application/octet-stream'
): void => {
  const cleaned = stripDataUrlPrefix(base64);
  const byteCharacters = atob(cleaned);
  const byteNumbers = new Array<number>(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const blob = new Blob([new Uint8Array(byteNumbers)], { type: contentType });
  const blobUrl = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(blobUrl);
};

const pickFileName = (data: Record<string, unknown>, fallback: string): string => {
  if (typeof data.fileName === 'string' && data.fileName.trim().length > 0) {
    return data.fileName;
  }
  if (typeof data.filename === 'string' && data.filename.trim().length > 0) {
    return data.filename;
  }
  return fallback;
};

const pickContentType = (data: Record<string, unknown>): string => {
  if (typeof data.contentType === 'string' && data.contentType.trim().length > 0) {
    return data.contentType;
  }
  if (typeof data.mimeType === 'string' && data.mimeType.trim().length > 0) {
    return data.mimeType;
  }
  return 'application/octet-stream';
};

export const commonDownloadService = {
  async downloadFromEndpoint(endpoint: string, opts: DownloadOptions): Promise<void> {
    const data = await http.get<UnknownDownloadData>(endpoint, {
      showSuccessToast: false,
    });

    // ۱. اگر دیتا رشته بود (URL یا Base64)
    if (typeof data === 'string') {
      if (isProbablyUrl(data)) {
        downloadByUrl(data);
        return;
      }

      downloadBase64AsFile(data, opts.defaultFileName);
      return;
    }

    // ۲. اگر دیتا آبجکت بود
    if (data && typeof data === 'object') {
      const record = data as Record<string, unknown>;

      const url = record.url ?? record.fileUrl;
      if (typeof url === 'string') {
        downloadByUrl(url);
        return;
      }

      const base64 = record.base64 ?? record.data;
      if (typeof base64 === 'string' && base64.length > 0) {
        const fileName = pickFileName(record, opts.defaultFileName);
        const contentType = pickContentType(record);
        downloadBase64AsFile(base64, fileName, contentType);
        return;
      }
    }

    throw createApiError('فرمت فایل دانلودی نامعتبر است.', 0, data);
  },
};
