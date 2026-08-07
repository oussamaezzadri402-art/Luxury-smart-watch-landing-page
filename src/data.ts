import { WatchVariation, Review } from './types';

export const WATCH_VARIATIONS: WatchVariation[] = [
  {
    id: 'rolex-rose-gold',
    name: 'Rolex Land-Dweller Rose Gold Honeycomb',
    nameAr: 'روليكس روز جولد - ميناء خلية النحل الملكي',
    price: 399, // 399 DH
    originalPrice: 799,
    image: '/images/rolex_rose_gold_1785877312553.jpg',
    colorCode: '#f59e0b', // Rose Gold Amber
    colorName: 'روز جولد فاخر (Rose Gold)',
    strapType: 'metal',
    strapNameAr: 'فولاذ روز جولد صلب (Rose Gold Jubilee)'
  },
  {
    id: 'rolex-ice-blue',
    name: 'Rolex Day-Date Silver Ice Blue Meteorite',
    nameAr: 'روليكس داي-ديت فضية - ميناء أيس بلو نيزكي',
    price: 399,
    originalPrice: 799,
    image: '/images/rolex_ice_blue_1785877323224.jpg',
    colorCode: '#38bdf8', // Ice Blue Sky
    colorName: 'أيس بلو نيزكي (Ice Blue)',
    strapType: 'metal',
    strapNameAr: 'فولاذ فضي صلب (President Bracelet)'
  },
  {
    id: 'rolex-navy-blue',
    name: 'Rolex Datejust Silver Atlantic Navy Blue',
    nameAr: 'روليكس ديت-جست الفضية - ميناء أزرق أطلسي',
    price: 399,
    originalPrice: 799,
    image: '/images/rolex_navy_blue_1785877337027.jpg',
    colorCode: '#2563eb', // Atlantic Navy Blue
    colorName: 'أزرق أطلسي ملكي',
    strapType: 'metal',
    strapNameAr: 'فولاذ فضي صلب (Oyster Steel)'
  }
];

export const MOROCCAN_CITIES = [
  { name: 'الدار البيضاء (Casablanca)', shippingFee: 0 },
  { name: 'الرباط (Rabat)', shippingFee: 0 },
  { name: 'مراكش (Marrakech)', shippingFee: 0 },
  { name: 'طنجة (Tangier)', shippingFee: 0 },
  { name: 'أكادير (Agadir)', shippingFee: 0 },
  { name: 'فاس (Fes)', shippingFee: 0 },
  { name: 'مكناس (Meknes)', shippingFee: 0 },
  { name: 'وجدة (Oujda)', shippingFee: 0 },
  { name: 'القنيطرة (Kenitra)', shippingFee: 0 },
  { name: 'تطوان (Tetouan)', shippingFee: 0 },
  { name: 'الناظور (Nador)', shippingFee: 0 },
  { name: 'المحمدية (Mohammedia)', shippingFee: 0 },
  { name: 'الجديدة (El Jadida)', shippingFee: 0 },
  { name: 'آسفي (Safi)', shippingFee: 0 },
  { name: 'تمارة (Temara)', shippingFee: 0 },
  { name: 'سلا (Sale)', shippingFee: 0 },
  { name: 'بني ملال (Beni Mellal)', shippingFee: 0 },
  { name: 'الرشيدية (Errachidia)', shippingFee: 0 },
  { name: 'العيون (Laayoune)', shippingFee: 0 },
  { name: 'الداخلة (Dakhla)', shippingFee: 0 }
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'أمين فكاك',
    city: 'الدار البيضاء',
    rating: 5,
    comment: 'الصراحة طوب بزاف! عاد وصلتني البارح ف كازا، الموديل د الروز جولد مع الميناء د خلية النحل كيحمق ف اليد. التقالة ديال الفولاذ واللمعان ديال الإطار الفاخر طالع واعر بزاف.',
    date: 'منذ ساعتين',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    verifiedPurchase: true,
    productImage: '/images/rolex_rose_gold_1785877312553.jpg'
  },
  {
    id: 'rev-2',
    userName: 'سارة العلمي',
    city: 'الرباط',
    rating: 5,
    comment: 'توصيل سريع جداً، طلبت موديل الأيس بلو (Ice Blue) الصباح، جابهالي الليفرور ف العشية تال تمارة. حليت العلبة جربتها ف يدي عاد خلصت. الميناء النيزكي كيحمق وراقي بزاف ف اللبس.',
    date: 'منذ يوم',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    userName: 'ياسين بنجلون',
    city: 'مراكش',
    rating: 5,
    comment: 'الساعة ثقيلة ومصوبة من الفولاذ الصلب الممتاز، الديزاين ديالها واللمعة ديال الميناء الأزرق الأطلسي خطيرة ف الضوء. قلبتها مزيان قبل ما نخلص الليفرور. كنشكركم على المصداقية.',
    date: 'منذ يومين',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    verifiedPurchase: true,
    productImage: '/images/rolex_ice_blue_1785877323224.jpg'
  },
  {
    id: 'rev-4',
    userName: 'فاطمة الزهراء',
    city: 'طنجة',
    rating: 5,
    comment: 'خديت موديل الروز جولد هدية لراجلي ف العيد ميلاد ديالو وعجباتو بزاااف! الجودة ديال السير والفولاذ واعرة. وخدمة الزبناء فالوتساب كانو صبورين معايا وجاوبوني فالحين. تبارك الله عليكم.',
    date: 'منذ 3 أيام',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    verifiedPurchase: true
  }
];

export const FAQS = [
  {
    q: 'كيفاش نقدر نطلب الساعة؟',
    a: 'ساهل بزاف، غير عمر المعلومات ديالك (السمية، التيليفون، والمدينة) فالفورم التحت، وحنا غادي نتصلو بيك فقل من 24 ساعة باش نأكدو معاك الطلب ونصيفطوها ليك.'
  },
  {
    q: 'شحال كياخد التوصيل ووقت الكارانتي؟',
    a: 'التوصيل سريع بزاف وكياخد من 24 تال 48 ساعة كاع المدن فالمغرب، وهو مجاني 100%. الساعة كتجي مع ضمانة ديال سنة كاملة ضد العيوب التقنية.'
  },
  {
    q: 'واش نقدر نحل الكرتونة ونشوف الساعة عاد نخلص؟',
    a: 'طبعاً! هادي ميزة "الدفع عند الاستلام". ملي كيوصلك الليفرور، كتحل الكرتونة، كتشوف الساعة وتجربها عاد كتخلصو. الثقة هي أهم حاجة عندنا.'
  },
  {
    q: 'واش لون الفولاذ والميناء كيتغير ولا ضد الماء؟',
    a: 'أكيد لا! الساعة مصنوعة من الفولاذ الصلب المقاوم للصدأ (Oyster Steel) بطبقة حماية من الخدش والتغير ف اللون، ومقاومة للماء ف الاستعمالات اليومية بحال غسل اليدين، الوضوء، والمطر.'
  }
];
