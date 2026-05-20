import ExperienceTimeline from '@/components/ExperienceTimeline';
import { workExperience, clubExperience, additionalResumeInfo } from '@/lib/data';

export default function Experience() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
            Experience
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Internships, founding work, student org engineering, and the awards and interests I usually tuck at
            the bottom of a PDF.
          </p>
        </div>

        <section className="mb-20">
          <ExperienceTimeline experiences={workExperience} title="Work Experience" />
        </section>

        <section className="mb-20">
          <ExperienceTimeline experiences={clubExperience} title="Clubs & Organizations" />
        </section>

        <section className="rounded-2xl border border-gray-100 bg-gradient-to-br from-primary-50 to-accent-50 p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-8">
            Additional Information
          </h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-primary-200">
                Awards
              </h3>
              <ul className="space-y-2">
                {additionalResumeInfo.awards.map((item) => (
                  <li key={item} className="text-gray-700 flex items-start">
                    <span className="text-primary-500 mr-2 mt-1.5">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-primary-200">
                Interests and Activities
              </h3>
              <ul className="space-y-2">
                {additionalResumeInfo.interestsAndActivities.map((item) => (
                  <li key={item} className="text-gray-700 flex items-start">
                    <span className="text-primary-500 mr-2 mt-1.5">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-gray-700 leading-relaxed">
                <span className="font-semibold text-gray-900">Fun fact: </span>
                {additionalResumeInfo.funFact}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
