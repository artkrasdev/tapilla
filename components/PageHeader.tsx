import { Button } from "@/components/ui/button";

interface PageHeaderProps {
    subtitle: string;
    heading: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
}

export default function PageHeader({ subtitle, heading, description, buttonText, buttonLink }: PageHeaderProps) {
    return (
        <section className="relative w-full bg-black overflow-hidden pt-16">
            {/* Content — same wrapper as HeroSection / BrandsSection */}
            <div className="relative z-10 mx-auto w-full max-w-content px-[5%] py-8 md:py-10 md:px-8 lg:px-12">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-12 lg:gap-20">
                    {/* Left column */}
                    <div className="flex flex-col gap-2">
                        {/* Subtitle */}
                        <p className="text-[1.4rem] font-normal tracking-tight text-white/70 font-secondary">
                            {subtitle}
                        </p>

                        {/* Heading */}
                        <h1 className="text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] tracking-tighter uppercase text-white">
                            {heading}
                        </h1>
                    </div>

                    {/* Right column — description */}
                    <div className="flex flex-col justify-center self-stretch max-w-[500px] gap-4 items-start">
                        <p className="text-base font-light leading-5 tracking-tight text-white text-left">
                            {description}
                        </p>
                        {buttonText && buttonLink && (
                            <Button variant="default" render={<a href={buttonLink} />} nativeButton={false}>
                                {buttonText}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
