
interface PagePlaceholderProps {
  title: string;
  description: string;
}

export default function PagePlaceholder({title, description}:PagePlaceholderProps){
    return(
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <p className="text-sm font-semibold text-sky-600">JOBTRACK</p>
            <h1 className=" mt-3 text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
            <p className="mt-3 leading-7 text-slate-600">{description}</p>
        </section>
    )
}