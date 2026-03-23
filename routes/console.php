<?php

use App\Support\Seo\SitemapBuilder;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('seo:generate-sitemap', function (SitemapBuilder $sitemapBuilder) {
    $path = $sitemapBuilder->writeToPublicPath();

    $this->info("Sitemap generated: {$path}");
})->purpose('Generate public sitemap.xml for SEO crawlers');
