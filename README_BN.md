# AANO PWA Preview v2

এটি AANO-এর একটি উন্নত Progressive Web App (PWA) প্রিভিউ। iPhone-এর Safari থেকে ওয়েবসাইট খুলে Share → Add to Home Screen ব্যবহার করা যায়।

## GitHub Pages-এ আপডেট
1. ZIP extract করুন।
2. Repository-এর root-এ `index.html`, `style.css`, `app.js`, `manifest.webmanifest`, `sw.js` রাখুন।
3. `icons` নামে folder তৈরি করে `icon-192.png` ও `icon-512.png` সেখানে রাখুন।
4. GitHub Pages চালু করুন এবং কিছুক্ষণ অপেক্ষা করুন।
5. iPhone Safari-তে সাইট খুলে reload দিন। পুরনো cache থাকলে Safari-তে website data clear করে আবার খুলুন।

## এই সংস্করণে কাজ করে
- Home, service cards, service search
- New request form with required fields
- Local request history and filters
- Favourite services
- Account/settings preview
- Responsive iPhone layout and PWA offline shell

## সীমাবদ্ধতা
এটি এখনো demo frontend। অর্ডার শুধু ওই browser/device-এর local storage-এ থাকে। Login, cloud database, real rider dispatch, live GPS, SMS/OTP, payment gateway, refunds এবং customer support backend সংযুক্ত নয়। কোনো payment বা delivery সম্পন্ন হয়েছে বলে এটি দাবি করে না।

## নিরাপত্তা
Public GitHub repository-তে password, API secret, Supabase service-role key বা ব্যক্তিগত তথ্য আপলোড করবেন না।
