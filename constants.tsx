
import React from 'react';
import { Poet, Poem } from './types';

export const POETS: Poet[] = [
  {
    id: 'hafez',
    name: 'حافظ شیرازی',
    englishName: 'Hafez',
    bio: 'خواجه شمس‌الدین محمد بن بهاءالدّین محمد حافظ شیرازی، معروف به لسان‌الغیب.',
    century: 'سده هشتم',
    image: 'https://picsum.photos/seed/hafez/400/300'
  },
  {
    id: 'saadi',
    name: 'سعدی شیرازی',
    englishName: 'Saadi',
    bio: 'ابومحمد مُشرف‌الدین مُصلح بن عبدالله بن مشرف، متخلص به سعدی، شاعر و نویسنده پارسی‌گوی.',
    century: 'سده هفتم',
    image: 'https://picsum.photos/seed/saadi/400/300'
  },
  {
    id: 'rumi',
    name: 'مولانا جلال‌الدین',
    englishName: 'Rumi',
    bio: 'جلال‌الدین محمد بلخی معروف به مولوی و مولانا و رومی، از مشهورترین شاعران پارسی‌گوی.',
    century: 'سده هفتم',
    image: 'https://picsum.photos/seed/rumi/400/300'
  },
  {
    id: 'khayyam',
    name: 'خیام نیشابوری',
    englishName: 'Khayyam',
    bio: 'حکیم غیاث‌الدین ابوالفتح عُمَر بن ابراهیم خیام نیشابوری، همه‌چیزدان، فیلسوف، ریاضی‌دان و منجم.',
    century: 'سده پنجم',
    image: 'https://picsum.photos/seed/khayyam/400/300'
  },
  {
    id: 'ferdowsi',
    name: 'فردوسی طوسی',
    englishName: 'Ferdowsi',
    bio: 'حکیم ابوالقاسم فردوسی طوسی، حماسه‌سرای بزرگ ایران و سرایندهٔ شاهنامه.',
    century: 'سده چهارم و پنجم',
    image: 'https://picsum.photos/seed/ferdowsi/400/300'
  }
];

export const SAMPLE_POEMS: Poem[] = [
  {
    id: 'h1',
    poetId: 'hafez',
    title: 'الا یا ایها الساقی',
    type: 'ghazal',
    verses: [
      ['الا یا ایها الساقی ادر کأسا و ناولها', 'که عشق آسان نمود اول ولی افتاد مشکل‌ها'],
      ['به بوی نافه‌ای کاخر صبا زان طره بگشاید', 'ز تاب جعد مشکینش چه خون افتاد در دل‌ها'],
      ['به می سجاده رنگین کن گرت پیر مغان گوید', 'که سالک بی‌خبر نبود ز راه و رسم منزل‌ها']
    ]
  },
  {
    id: 's1',
    poetId: 'saadi',
    title: 'بنی آدم',
    type: 'qasida',
    verses: [
      ['بنی آدم اعضای یکدیگرند', 'که در آفرینش ز یک گوهرند'],
      ['چو عضوی به درد آورد روزگار', 'دگر عضوها را نماند قرار'],
      ['تو کز محنت دیگران بی‌غمی', 'نشاید که نامت نهند آدمی']
    ]
  },
  {
    id: 'k1',
    poetId: 'khayyam',
    title: 'اسرار ازل',
    type: 'rubaie',
    verses: [
      ['اسرار ازل را نه تو دانی و نه من', 'وین حرف معما نه تو خوانی و نه من'],
      ['هست از پس پرده گفتگوی من و تو', 'چون پرده برافتد نه تو مانی و نه من']
    ]
  }
];

export const Patterns = {
  FloralBorder: () => (
    <svg width="100%" height="20" viewBox="0 0 100 20" preserveAspectRatio="none" className="opacity-20">
      <path d="M0 10 Q 25 0, 50 10 T 100 10" fill="none" stroke="#b58d3d" strokeWidth="1" />
    </svg>
  )
};
