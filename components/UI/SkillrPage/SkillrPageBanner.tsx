export function SkillrPageBanner(props: { backgroundImg: string; categoryName?: string }) {
    return (
        <div
            className="w-full h-full min-h-[300px] md:min-h-[400px] bg-cover bg-no-repeat bg-center"
            style={{
                backgroundImage: `url(${props.backgroundImg})`,
            }}
        >
            <div className="flex justify-center pt-20 md:pt-[60px]">
                <div className="px-10 max-w-[1440px] w-full">
                    <h3 className="font-semibold text-white text-[26px]">{props.categoryName}</h3>
                </div>
            </div>
        </div>
    );
}
