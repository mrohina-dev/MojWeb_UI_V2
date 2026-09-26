import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'هدر اصلی «سامانه موج بانک صادرات ایران» با پشتیبانی از دو واریانت default و primary، اکشن‌های اعلان/پیام/خروج، تولتیپ‌ها و Badge شمارنده.',
      },
    },
  },

  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'primary'],
      description: 'واریانت ظاهری هدر (مینیمال یا سازمانی)',
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

    onNotificationsClick: { control: false },
    onMessagesClick: { control: false },
    onLogout: { control: false },
  },

  args: {
    variant: 'default',
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

/** ۲) واریانت primary (سازمانی) */
export const Primary: Story = {
  args: {
    variant: 'primary',
    unreadNotificationsCount: 12,
    unreadMessagesCount: 7,
  },
};

/** ۳) بدون اعلان و پیام (Badgeها نباید رندر شوند اگر Badge شما count=0 را مخفی می‌کند) */
export const NoCounters: Story = {
  args: {
    variant: 'default',
    unreadNotificationsCount: 0,
    unreadMessagesCount: 0,
  },
};

/** ۴) فقط اعلان‌ها */
export const OnlyNotifications: Story = {
  args: {
    variant: 'default',
    unreadNotificationsCount: 5,
    unreadMessagesCount: 0,
  },
};

/** ۵) فقط پیام‌ها */
export const OnlyMessages: Story = {
  args: {
    variant: 'default',
    unreadNotificationsCount: 0,
    unreadMessagesCount: 9,
  },
};

/** ۶) شمارنده‌های بزرگ برای تست clamp (مثلاً +99) */
export const LargeCounts: Story = {
  args: {
    variant: 'primary',
    unreadNotificationsCount: 120,
    unreadMessagesCount: 999,
  },
};

/** ۷) بدون هندلرها (برای بررسی حالت امن UI وقتی callback پاس داده نشده) */
export const WithoutHandlers: Story = {
  args: {
    variant: 'default',
    unreadNotificationsCount: 3,
    unreadMessagesCount: 2,
    onNotificationsClick: undefined,
    onMessagesClick: undefined,
    onLogout: undefined,
  },
};
