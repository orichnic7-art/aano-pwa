# AANO PWA Preview

এটি AANO Flutter source ZIP থেকে তৈরি একটি আলাদা, iPhone-friendly PWA preview।

## কী কাজ করে
- Home / Explore, Activity, Account navigation
- ৬টি service tile এবং search filter
- Request form
- Demo request localStorage-এ সংরক্ষণ
- PWA manifest ও service worker

## কী কাজ করে না
- Supabase login বা cloud database সংযুক্ত নয়
- Rider dispatch / live GPS / payment নেই
- Demo request শুধু এই browser/device-এ থাকে
- এটি native iOS IPA নয়

## Free hosting: GitHub Pages
1. GitHub account খুলুন এবং নতুন public repository তৈরি করুন, যেমন `aano-pwa`.
2. এই ZIP extract করে এর ভেতরের সব file ও `icons` folder repository-র root-এ upload করুন।
3. Repository → Settings → Pages → Deploy from a branch নির্বাচন করুন।
4. Branch `main`, folder `/ (root)` নির্বাচন করে Save করুন।
5. প্রকাশিত URL Safari-তে খুলুন।
6. iPhone Safari → Share → Add to Home Screen → Add।

গুরুত্বপূর্ণ: PWA install prompt/standalone mode-এর জন্য HTTPS hosting প্রয়োজন। GitHub Pages HTTPS দেয়।
