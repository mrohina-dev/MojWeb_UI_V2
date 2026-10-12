import { http, HttpResponse } from 'msw';
import { mockAuthResponse, mockCaptcha, mockCredentials, mockFiles } from './data';

const delay = () => new Promise((resolve) => setTimeout(resolve, 350));

export const handlers = [
  http.get('/api/common/GetCaptcha', async () => {
    await delay();
    return HttpResponse.json({ data: { captcha: mockCaptcha }, isSuccess: true, statusCode: 0 });
  }),

  http.post('/api/User/Login', async ({ request }) => {
    await delay();
    const body = (await request.json()) as { username?: string; password?: string; captcha?: string };

    if (
      body.username !== mockCredentials.username ||
      body.password !== mockCredentials.password ||
      body.captcha !== mockCredentials.captcha
    ) {
      return HttpResponse.json({ message: 'نام کاربری، رمز عبور یا کد امنیتی نادرست است.' }, { status: 401 });
    }

    return HttpResponse.json({ data: mockAuthResponse, isSuccess: true, statusCode: 0 });
  }),

  http.get('/api/User/TokenIsValid', async () => {
    await delay();
    return HttpResponse.json({ data: null, isSuccess: true, statusCode: 0 });
  }),

  http.post('/api/User/RefreshToken', async () => {
    await delay();
    return HttpResponse.json({ data: mockAuthResponse, isSuccess: true, statusCode: 0 });
  }),

  http.get('/api/User/Logout', async () => {
    await delay();
    return HttpResponse.json({ data: null, isSuccess: true, statusCode: 0 });
  }),

  http.get('/api/SalaryPay/GetSendFileList', async ({ request }) => {
    await delay();
    const url = new URL(request.url);
    const page = Math.max(Number(url.searchParams.get('page') ?? 1), 1);
    const size = Math.max(Number(url.searchParams.get('size') ?? 10), 1);
    const start = (page - 1) * size;

    return HttpResponse.json({
      data: {
        uploadedFile: mockFiles.slice(start, start + size),
        totalCount: mockFiles.length,
        page,
        size,
        totalPages: Math.ceil(mockFiles.length / size),
        isBranchUser: false,
        isSonati: false,
      },
      isSuccess: true,
      statusCode: 0,
    });
  }),

  http.post('/api/SalaryPay/Cancel', async () => {
    await delay();
    return HttpResponse.json({ data: null, isSuccess: true, statusCode: 0 });
  }),
];
