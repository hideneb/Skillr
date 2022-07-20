export function SkillrPageBanner(props: { backgroundImg: string }) {
    return (
        <div
            className="w-full h-full min-h-[300px] md:min-h-[400px] bg-cover bg-no-repeat bg-center"
            style={{
                backgroundImage: `url(${props.backgroundImg})`,
            }}
        ></div>
    );
}
