import programs from "./Programs";

const now = new Date();
const day = now.getDate();
const month = now.getMonth() + 1;
const year = now.getFullYear();

const notifications = [
    {
        id: "birthday",
        content: [{
            id: "birthday",
            sources: [`/api/students?date_month_eq_birth=${month}&date_dayOfMonth_eq_birth=${day}&select_fullname=1&select_uuid=1`],
            renderUnknown: () => "Nadie cumple años hoy...",
            formatter: student => `${student.fullname} cumple años hoy. Felicital@`
        }] 
    },
    {
        id: "annivday",
        content: programs.names().map(program => ({ 
            id: `annivday-${program}`,
            sources: annivQuery(program, true),
            renderUnknown: () => `Nadie festeja su aniversario en ${programs.alias(program)} hoy...`,
            formatter: student => `${student.fullname} cumple ${annivMonths(student, program)} meses en ${programs.alias(program)} en Kumon. Felicital@`
        }))
    }
];

const panels = [
    {
        id: "birthmonth", 
        title: "Cumpleaños del Mes",
        content: [{
            id: "birthmonth",
            sources: [`/api/students?date_month_eq_birth=${month}&select_fullname=1&select_birth=1&select_uuid=1`],
            renderUnknown: () => "Nadie cumple años este mes...",
            renderLoading: () => "Cargando...",
            formatter: student => {
                const birth = new Date(student.birth);
                return `${student.fullname} cumple años este mes el día ${birth.getUTCDate()} / ${birth.getUTCMonth() + 1}`
            }
        }]
    },
    {
        id: "annivmonth",
        title: "Aniversarios del Mes",
        content: programs.names().map(program => ({ 
            id: `annivmonth-${program}`,
            sources: annivQuery(program, false),
            renderUnknown: () => `Nadie festeja su aniversario en ${programs.alias(program)} hoy...`,
            renderLoading: () => "Cargando...",
            formatter: student => `${student.fullname} cumple este mes ${annivMonths(student, program)} meses en ${programs.alias(program)} en Kumon.`
        }))
    },
    {
        id: "paymonth",
        title: "Pagos del Mes",
        content: programs.names().map(program => ({
            id: `paymonth-${program}`,
            sources: [`api/students?date_toDate_ne_programs>${program}>pay-current>starting=${year}-${String(month).padStart(2, 0)}-01&select_fullname=1&select_programs>${program}=1&select_uuid=1`,
            `api/students?compare_gt_programs>${program}>fee=programs>${program}>pay-current>amount&date_toDate_eq_programs>${program}>pay-current>starting=${year}-${String(month).padStart(2, 0)}-01&select_fullname=1&select_programs>${program}=1&select_uuid=1`],
            renderUnknown: () => `Nadie debe pagos en ${programs.alias(program)} este mes...`,
            renderLoading: () => "Cargando...",
            formatter: student => {
                const pay_current = student.programs[program]["pay-current"];
                const starting = new Date(pay_current.starting);
                const pay_amount = starting.getUTCMonth() + 1 === month && starting.getUTCFullYear() === year ? pay_current.amount : 0;
                return `${student.fullname} pagó $${pay_amount} / $${student.programs[program].fee} este mes en ${programs.alias(program)}.`
            }
        }))
    }
];

function annivQuery(program, isDay) {
    const maxmonths = 12; const difference = 3;
    let queryYear = year; 
    let queryMonth = month;
    const queries = {};
    for (let i = difference; i < maxmonths + difference; i += difference) {
        queryMonth -= difference;
        if (queryMonth <= 0) { 
            queryYear--; 
            const mod = ((queryMonth % 12) + 12) % 12; 
            queryMonth = mod === 0 ? 12 : mod;
        }
        queries[queryYear] = queries[queryYear] ? [...queries[queryYear], queryMonth] : [queryMonth]
    }
    return Object.keys(queries).reduce((query, queryYear) => {
        query.push(`/api/students?date_year_eq_programs>${program}>enroll=${queryYear}&date_month_eq_programs>${program}>enroll=${queries[queryYear].join("|")}${isDay ? `&date_dayOfMonth_eq_programs>${program}>enroll=${day}` : ""}&select_fullname=1&select_programs>${program}=1&select_uuid=1`);
        return query;
    }, []);
}

function annivMonths(student, program) {
    const enroll = new Date(student.programs[program].enroll);
    return now.getMonth() - enroll.getUTCMonth() + (12 * (now.getFullYear() - enroll.getUTCFullYear()));
}

export {notifications, panels}