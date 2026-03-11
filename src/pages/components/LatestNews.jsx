import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { blogPosts, faqData } from '@/constants/home';
import { PAGE_ICONS } from '@/lib/icons/page.icons';
import React from 'react';
import { Link } from 'react-router-dom';

const LatestNews = () => {
  return (
    <div>
      <section className="py-25">
        <div className="container mx-auto max-w-[540px] md:max-w-[1320px] md:px-7 lg:px-3">
          <div className="flex flex-col items-start justify-between md:flex-row md:gap-8 lg:gap-2">
            {/* latest news */}
            <div className="md:w-[50%] px-3 md:mb-0 mb-25">
              <div className="lg:mr-[110px] space-y-10">
                {/* title */}
                <div className="space-y-3 text-start">
                  <p className="text-base font-medium tracking-[.095em] uppercase text-suxnix-primary">
                    .. Suxnix News ..
                  </p>
                  <h2 className="leading-tight! text-suxnix-heading text-[40px] md:text-5xl">
                    Latest News
                  </h2>
                </div>
                {/* content */}
                <div className="space-y-12">
                  {blogPosts.map((post) => {
                    return (
                      <div key={post.id}>
                        <div className="flex flex-col gap-4 sm:flex-row">
                          {/* image */}
                          <div className="w-[50%] lg:w-[50%]">
                            <Link to={'/blog/' + post.id}>
                              <img
                                src={post.image}
                                alt={post.id}
                                className="w-full h-full rounded-lg"
                              />
                            </Link>
                          </div>
                          <div className="w-full space-y-4 sm:space-y-7">
                            <div className="flex justify-between gap-1">
                              <p className="text-base font-medium transition-all duration-300 cursor-pointer text-suxnix-heading hover:text-suxnix-primary">
                                {post.category}
                              </p>
                              <p className="text-base">
                                <PAGE_ICONS.CLOCK
                                  className="inline-block mr-1"
                                  size={16}
                                />
                                {post.date}
                              </p>
                            </div>
                            <div className="">
                              <h1 className="text-xl transition-all duration-300 cursor-pointer hover:text-suxnix-primary">
                                {post.title.slice(0, 26) + '...'}
                              </h1>
                            </div>
                            <div className="flex items-center justify-between w-full gap-1">
                              <div className="font-normal text-suxnix-heading">
                                <p>
                                  Posted by -{' '}
                                  <Link to="/">
                                    <span className="cursor-pointer text-suxnix-primary">
                                      {post.author}
                                    </span>
                                  </Link>
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <p>
                                  <PAGE_ICONS.MAIL
                                    className="inline-block mr-1"
                                    size={16}
                                  />
                                  {post.comments}
                                </p>
                                <p>
                                  <PAGE_ICONS.VIEWS
                                    className="inline-block mr-1"
                                    size={16}
                                  />
                                  {post.views}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* faqs */}
            <div className="md:w-[50%] px-3">
              <div className="lg:ml-[100px] space-y-8">
                {/* title */}
                <div className="space-y-3 text-start">
                  <p className="text-base font-medium tracking-[.095em] uppercase text-suxnix-primary">
                    .. Common Questions ..
                  </p>
                  <h2 className="leading-tight! text-suxnix-heading text-[40px] md:text-5xl">
                    Frequently Asked Questions
                  </h2>
                </div>
                {/* faqs */}
                <div className="">
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue="ingredients"
                    className="md:max-w-100 lg:max-w-140 mx-auto"
                  >
                    {faqData.map((faq) => {
                      return (
                        <AccordionItem
                          value={faq.value}
                          key={faq.id}
                          className="px-4 py-3 border-none rounded-md"
                        >
                          <AccordionTrigger>
                            <h1 className="text-lg font-medium text-suxnix-heading">
                              <span className="mr-2 text-suxnix-primary">
                                0{faq.id}.
                              </span>{' '}
                              {faq.question}
                            </h1>
                          </AccordionTrigger>
                          <AccordionContent className="text-base/7">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LatestNews;
