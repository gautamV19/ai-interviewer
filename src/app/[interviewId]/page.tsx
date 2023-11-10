import {Interview} from "@/components/container/Interview";

const Page = ({params}: {params: {interviewId: string}}) => {
    return <Interview id={params.interviewId}/>
}

export default Page