<?php

namespace App\Support\Seo;

use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class SitemapBuilder
{
    public function build(): Sitemap
    {
        return Sitemap::create()
            ->add(
                Url::create(route('home'))
                    ->setPriority(1.0)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
            )
            ->add(
                Url::create(route('register.here'))
                    ->setPriority(0.9)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
            )
            ->add(
                Url::create(route('rules-and-regulation'))
                    ->setPriority(0.8)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
            )
            ->add(
                Url::create(route('sample-questions-and-answers'))
                    ->setPriority(0.7)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
            )
            ->add(
                Url::create(route('exam-results'))
                    ->setPriority(0.7)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
            )
            ->add(
                Url::create(route('privacy-policy'))
                    ->setPriority(0.4)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_YEARLY)
            );
    }

    public function writeToPublicPath(?string $path = null): string
    {
        $path ??= public_path('sitemap.xml');

        $this->build()->writeToFile($path);

        return $path;
    }
}
