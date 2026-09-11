import DrawRule from './motion/DrawRule';

/** The centered serif headings on the home page, with the rule that draws out underneath. */
export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-[1.875rem] mt-20 text-center sm:mt-[4.25rem]">
      <h2 className="font-serif text-[2.25rem] font-normal leading-tight tracking-[-0.01em] sm:text-[2.75rem]">{children}</h2>
      <DrawRule />
    </div>
  );
}
