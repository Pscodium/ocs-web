import Markdown from "@/components/common/markdown";

export interface InitialProps {}

export default function Initial() {
    return (
        <div className="flex items-center justify-center w-full min-h-screen">
            <Markdown />
        </div>
    );
}