import React from 'react';

import TestimonialImage01 from '../images/Arc Osei Kwame Agyeman.png';
import TestimonialImage02 from '../images/Arc. Michael Akiyolah.png';
import TestimonialImage03 from '../images/Mr. Kusum Appiah.png';
import TestimonialImage04 from '../images/Mr. Samuel Aggrey.png';
import TestimonialImage05 from '../images/Mr. Jack Andrew Dotsey.png';

function Testimonials() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Our Esteemed Jurors</h2>
            <p className="text-xl text-gray-400">Submissions will be disqualified from evaluation if:</p>
            <p className="text-xl text-gray-400">1. A competitor shall disclose his or her identity, or improperly attempt to influence the decision;</p>
            <p className="text-xl text-gray-400">2. A submission is received after the latest time stated in the competition conditions;</p>
            <p className="text-xl text-gray-400">3. The entry does not meet the above submission requirements</p>
          </div>

          {/* Testimonials */}
          <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 items-start lg:max-w-none">

            {/* 1st testimonial */}
            <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up">
              <div>
                <div className="relative inline-flex flex-col mb-4">
                  <img className="rounded-full" src={TestimonialImage01} width="48" height="48" alt="Testimonial 01" />
                    <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                    </svg>
                        </div>
                </div>
                <blockquote className="text-lg text-gray-400 grow">— A Past President (2009-2012) of Ghana Institute of Architects, Arc. Osei Kwame Agyeman has over the years served in various
capacities on national projects including Technical Review Committee of the Ghana Building Code, Consulting Team on Operations
Manual for MIDA, National Sustainable Consumption and Production Action Plan, Review of National Urban Slum Action Policy, Strategic
Environmental Assessment of National Urban Policy,etc.</blockquote>
                <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                  <cite className="text-gray-200 not-italic">Arc. Osei Kwame Agyeman </cite> - <a className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="#0">Past President (2009-2012)</a>
                </div>
              </div>

              {/* 2nd testimonial */}
              <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="200">
                <div>
                  <div className="relative inline-flex flex-col mb-4">
                    <img className="rounded-full" src={TestimonialImage02} width="48" height="48" alt="Testimonial 02" />
                      <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                      </svg>
                        </div>
                  </div>
                  <blockquote className="text-lg text-gray-400 grow">— With over thirty-six (36) years of professional practice in architecture and related discipline, Arc. Michael Akiyolah Amui was elected into
                  Associated Membership of Ghana institute of Architects in 1986 and has over the years worked on numerous projects including but not
                  limited to the design and supervision of the American Embassy Budsfield Flat, Multi Purpose Hall for Lincoln Community School, etc.</blockquote>
                  <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                    <cite className="text-gray-200 not-italic">Arc. Michael Akiyolah Amui</cite> - <a className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="#0">Partner of Space Plan -</a>
                  </div>
                </div>

                {/* 3rd testimonial */}
                <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="400">
                  <div>
                    <div className="relative inline-flex flex-col mb-4">
                      <img className="rounded-full" src={TestimonialImage03} width="48" height="48" alt="Testimonial 03" />
                        <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                        </svg>
                        </div>
                    </div>
                    <blockquote className="text-lg text-gray-400 grow">— Mr. Kusum Appiah is the Head of the Ghana CARES Delivery Unit at the Ministry of Communications and Digitalisation in Ghana where
                      he is delivering a programme of fast-track, national digitalisation projects.
                      He is a technology leader, enterprise architect, and programme manager with a strong professional services background and experience
                      gained working in UK, Europe and across Africa primarily in the IT, Telecommunications and Government sectors.</blockquote>
                    <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                      <cite className="text-gray-200 not-italic">Mr. Kusum Appiah </cite> - <a className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="#0">Ministry of Communications and Digitalisation</a>
                    </div>
                  </div>
                  {/* 4th Jury */}
                  <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="400">
                      <div>
                          <div className="relative inline-flex flex-col mb-4">
                            <img className="rounded-full" src={TestimonialImage04} width="48" height="48" alt="Testimonial 03" />
                            <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                            </svg>
                          </div>
                      </div>
                      <blockquote className="text-lg text-gray-400 grow">
                        — Mr. Samuel Aggrey formally joined the Ministry of Finance in July, 2006 and is currently the head of the office of the Chief Director. His
                          core responsibility is to coordinate the technical and operational support for the Chief Director of the Ministry of Finance in the delivery of
                          his mandate. He is an experienced professional with over 15 years of public sector experience in the areas of inclusive development, public financial
                          management
                      </blockquote>
                      <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                        <cite className="text-gray-200 not-italic">Mr. Samuel Aggrey </cite> - <a className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="#0">Ministry of Finance </a>
                      </div>
                    </div>
                    {/* 5th Jury */}
                  <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="400">
                      <div>
                          <div className="relative inline-flex flex-col mb-4">
                            <img className="rounded-full" src={TestimonialImage05} width="48" height="48" alt="Testimonial 03" />
                            <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                            </svg>
                          </div>
                      </div>
                      <blockquote className="text-lg text-gray-400 grow">
                        — Jack Andrews Dotsey is a PhD candidate in Adult Education and Human Resource Studies at the University of Ghana with research
                        interest in Governance, Leadership and Community Development. He is the Executive Director, University of Ghana Annual New Year
                        School and Conference, a CSR oriented towards influencing national policy formulation and development
                        </blockquote>
                      <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                        <cite className="text-gray-200 not-italic">Mr. Kusum Appiah </cite> - <a className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="#0">Ministry of Communications and Digitalisation</a>
                      </div>
                    </div>
                </div>
                
              </div>
            </div>
</section>
  );
}

export default Testimonials;
