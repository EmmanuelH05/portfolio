import ExperienceTimeline from '@/components/ExperienceTimeline';
import { workExperience, volunteering } from '@/lib/data';

export default function Experience() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
            Experience
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Building impactful solutions and contributing to meaningful causes
          </p>
        </div>

        {/* Work Experience */}
        <section className="mb-20">
          <ExperienceTimeline 
            experiences={workExperience} 
            title="Work Experience"
          />
        </section>

        {/* Volunteering */}
        <section>
          <ExperienceTimeline 
            experiences={volunteering} 
            title="Volunteering"
          />
        </section>
      </div>
    </div>
  );
}
