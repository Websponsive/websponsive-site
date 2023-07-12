---
title: How To Make Your Site Visible On Google
tags:
  - post
  - featured
image: https://res.cloudinary.com/dvrziwgxp/image/upload/v1689149348/google-home-page-ss-1920_xa7lft.jpg
date: 2023-07-08T10:03:57.515Z
desc: Does you site not appear on Google when you search for it ? Read along as
  we explain in detail how to make your site visible to search engines, and
  stick along for some extra tips at the end
author: Eduard
authorimg: /assets/Logo.png
---
In our digital age, having a website for your business is almost a prerequisite for being successful. As people say, if you're not on Google, you're invisible. But how do you get on Google anyways ? Read along as we tell you everything you have to know about getting your site to appear on search results.

We already assume you have a site, hosted it, and have a custom domain to work with. If you don't, you can host your site with [Netlify](https://app.netlify) and you can buy a custom domain at [Namecheap](https://namecheap.com) or [Porkbun](https://porkbun.com), but avoid GoDaddy at all costs.

## Register your site on Google Search Console

![a screenshot from google's search console home page](https://res.cloudinary.com/dvrziwgxp/image/upload/v1689152101/google-search-console_u2ozyc.png)

[](https://search.google.com/search-console/about)Just like with addresses in real life, Google doesn't know about your site's existence if you don't make it aware that it exists. Here's where [Google Search Console](https://search.google.com/search-console/about) comes into play. It's a free tool that allows you to index your site in Google's databases, and make it available in search results. Google Search Console also offers valuable information about your rankings, backlinks and potential technical problems regarding your site, but more on that later.

When you go to search console's website, you're greeted with this window:

![screenshot of the property verification window on google search console](https://res.cloudinary.com/dvrziwgxp/image/upload/v1689152722/google-search-console-window_sjefgo.png)

You can scan for your site in two different ways: by domain or by URL prefix. Scanning by domain is recommended - it will be more thorough, as it will scan every single URL under your domain, including all prefixes (www.websponsive.net, websponsive.net), and accross both https:// and http://. This type of verification requires having access to your DNS records - if you don't, contact your web design agency or whoever is hosting your site for you.

## Verifying your ownership 

![verification using cname records](https://res.cloudinary.com/dvrziwgxp/image/upload/v1689153771/google-search-console-cname_vrk0mf.png)

After inputting our domain name in the field, we will select the CNAME record type, and we will be provided with the CNAME label and destination. If you wish to read more about what a CNAME record is, you can do it [here](https://www.cloudflare.com/learning/dns/dns-records/dns-cname-record/), but in simple terms it comes from "canonical name", and it behaves like an alternative address that points to your domain's IP address.

Then, we go to our provider and create a new CNAME record. The execution of this step differs for each provider, so you should look up a tutorial for your specific provider. Here is how to do it for [Cloudflare](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records), [Netlify](https://docs.netlify.com/domains-https/netlify-dns/dns-records/#add-a-new-record), [Namecheap ](https://www.namecheap.com/support/knowledgebase/article.aspx/434/2237/how-do-i-set-up-host-records-for-a-domain/)and for Google's [Cloud DNS](https://cloud.google.com/dns/docs/records). 

After setting up the CNAME record with your provider, you can press verify on Google Search Console, but we're not done yet. Now, access "URL Inspection" from the sidebar, and you should see something like this: 

![screenshot showing how the inputted url isn't indexed](https://res.cloudinary.com/dvrziwgxp/image/upload/v1689167047/google-search-console-page-not-on-google_ldrnau.png)

Now press "Request Indexing", and you're all set ! Indexing might take a bit, so you should be patient. To check whether you're site now appears in searches, search for this query: "site:https://example.com" with your site's URL.

![screenshot demonstrating how to check whether your site is indexed](https://res.cloudinary.com/dvrziwgxp/image/upload/v1689170624/websponsive-url-search_npefpa.png)

Remember that it may take a upwards of 24 hours for your site to be indexed, and if you change your site, you have to request for your site to be indexed again.

## Other useful Search Console features

### 1. Performance tab

![screenshot demonstrating the performance tab of google search console](https://res.cloudinary.com/dvrziwgxp/image/upload/v1689171872/search_console_performance_report_fjd1wb.webp)

The performance tab shows some very useful statistics that show you how much traffic your site gets. On the top of the page, there is a graph presenting how many clicks you've gotten from search, how many times users have seen your page in search (impressions), your average Click Through Rate (how many of those impressions turned into clicks), and your average position on the search results page. 

On the bottom of the page, there is a table showing a breakdown of the amount of impressions and click for each page on your site, as well as the location and devices of your users.

### 2. Pages tab

![screenshot of the pages tab from google search console](https://res.cloudinary.com/dvrziwgxp/image/upload/v1689172803/pages-search-console_wgozwc.png)

The pages tab shows how many of your pages have been indexed and how many have not, as well as reasons for why those pages haven't been indexed (if applicable)

### 3. Sitemaps and Removals tabs

On the sitemap tab, you can submit a sitemap for Google to facilitate crawling, but it isn't mandatory, as Google will crawl all you URLs as long as they are linked between each other.

The removals tab can be used to quickly remove a page from Google if you wish to do so urgently, and also to see your previous removal requests.

### 4. Page experience, Core web vitals and Mobile Usability

![screenshot of the page experience tab](https://res.cloudinary.com/dvrziwgxp/image/upload/v1689173651/experience-search-console_yzhhgq.webp)

These tabs show a summary about your users' experience when browsing your site. These tabs will be empty at first, because Google has to gather this data first. 



That was it, thank you for reading ! If you found anything useful, check out our [Instagram](https://www.instagram.com/websponsive/) page, where we post other useful content like this, or read another post !