import { useTranslations } from "next-intl";
import PageHeader from "@/components/PageHeader";

export default function ServicesPage() {
    const t = useTranslations("ServicesPage");

    return (
        <main>
            <PageHeader
                subtitle={t("subtitle")}
                heading={t("heading")}
                description={t("description")}
                buttonText={"Contact Us"}
                buttonLink={"/contact"}
            />
        </main>
    );
}
