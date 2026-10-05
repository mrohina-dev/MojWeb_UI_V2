import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from './Header';
import { SidebarProvider } from '@/components/layout/sidebar/SidebarProvider';

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'هدر اصلی «سامانه موج بانک صادرات ایران» با پشتیبانی از دو واریانت default و primary، دکمه تاگل سایدبار، اکشن‌های اعلان/پیام/خروج، تولتیپ‌ها و Badge شمارنده.',
      },
    },
  },

  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'primary'],
      description: 'واریانت ظاهری هدر (مینیمال یا سازمانی)',
    },
    showSidebarToggle: {
      control: 'boolean',
      description: 'نمایش یا عدم نمایش دکمه باز و بسته کردن سایدبار',
    },
    unreadNotificationsCount: {
      control: { type: 'number', min: 0 },
      description: 'تعداد اعلان‌های نخوانده (Badge قرمز destructive)',
    },
    unreadMessagesCount: {
      control: { type: 'number', min: 0 },
      description: 'تعداد پیام‌های نخوانده (Badge آبی info)',
    },
    className: {
      control: 'text',
      description: 'کلاس اضافی برای wrapper هدر',
    },

    onSidebarToggle: { control: false },
    onNotificationsClick: { control: false },
    onMessagesClick: { control: false },
    onLogout: { control: false },
  },

  args: {
    variant: 'default',
    showSidebarToggle: false,
    unreadNotificationsCount: 3,
    unreadMessagesCount: 2,
    onNotificationsClick: () => alert('اعلان‌ها کلیک شد'),
    onMessagesClick: () => alert('پیام‌ها کلیک شد'),
    onLogout: () => alert('خروج کلیک شد'),
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

/** ۱) واریانت پیش‌فرض مینیمال */
export const Default: Story = {
  args: {
    variant: 'default',
  },
};

/** ۲) همراه با دکمه کنترل سایدبار در واریانت default */
export const WithSidebarToggle: Story = {
  args: {
    variant: 'default',
    showSidebarToggle: true,
  },
};

/** ۳) واریانت primary (سازمانی) همراه با دکمه سایدبار */
export const PrimaryWithToggle: Story = {
  args: {
    variant: 'primary',
    showSidebarToggle: true,
    unreadNotificationsCount: 12,
    unreadMessagesCount: 7,
  },
};

/** ۴) واریانت primary (سازمانی) بدون دکمه سایدبار */
export const Primary: Story = {
  args: {
    variant: 'primary',
    showSidebarToggle: false,
    unreadNotificationsCount: 12,
    unreadMessagesCount: 7,
  },
};

/** ۵) بدون اعلان و پیام (Badgeها نباید رندر شوند اگر Badge شما count=0 را مخفی می‌کند) */
export const NoCounters: Story = {
  args: {
    variant: 'default',
    unreadNotificationsCount: 0,
    unreadMessagesCount: 0,
  },
};

/** ۶) فقط اعلان‌ها */
export const OnlyNotifications: Story = {
  args: {
    variant: 'default',
    unreadNotificationsCount: 5,
    unreadMessagesCount: 0,
  },
};

/** ۷) فقط پیام‌ها */
export const OnlyMessages: Story = {
  args: {
    variant: 'default',
    unreadNotificationsCount: 0,
    unreadMessagesCount: 9,
  },
};

/** ۸) شمارنده‌های بزرگ برای تست clamp (مثلاً +99) */
export const LargeCounts: Story = {
  args: {
    variant: 'primary',
    showSidebarToggle: true,
    unreadNotificationsCount: 120,
    unreadMessagesCount: 999,
  },
};

/** ۹) بدون هندلرها (برای بررسی حالت امن UI وقتی callback پاس داده نشده) */
export const WithoutHandlers: Story = {
  args: {
    variant: 'default',
    showSidebarToggle: true,
    unreadNotificationsCount: 3,
    unreadMessagesCount: 2,
    onSidebarToggle: undefined,
    onNotificationsClick: undefined,
    onMessagesClick: undefined,
    onLogout: undefined,
  },
};
