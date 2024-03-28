import Link from 'next/link';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "../../../../lib/db";
import * as actions from '@/actions';
import ImgFondo from '@/components/ImgFondo';
import { TodoProps } from '../page';
import Header from '@/components/header';

type NameId = {
  name: string,
  id: string
}

export default async function Roadmap() {
  // const todolists = await db.todolist.findMany();
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user) {
    redirect("/login");
  }

  const todolists: TodoProps[] = await prisma.todo.findMany({
    where: { userId: data.session.user.id },
  });

  const todayList: NameId[]= [];
  const tomorrowList: NameId[] = [];
  const thisWeekList: NameId[] = [];
  const nextWeekList: NameId[] = [];
  const thisMonthList: NameId[] = [];
  const laterList: NameId[] = []
  const doneList: NameId[] = [];
  const otherList: NameId[] = [];

  todolists.map(({name, id, when}) => {
    if (when === 'Today') {
      todayList.push({name, id});
    } else if (when === 'Tomorrow') {
      tomorrowList.push({name, id});
    } else if (when === 'This Week') {
      thisWeekList.push({name, id});
    } else if (when === 'Next Week') {
      nextWeekList.push({name, id});
    } else if (when === 'This Month') {
      thisMonthList.push({name, id});
    } else if (when === 'Later') {
      laterList.push({name, id});
    } else if (when === 'Done') {
      doneList.push({name, id});
    } else {
      otherList.push({name, id});
    }
  })

  const maxList = Math.max(
    todayList.length, 
    tomorrowList.length,
    thisWeekList.length,
    nextWeekList.length,
    thisMonthList.length,
    laterList.length,
    doneList.length,
    otherList.length
  );
  const arrList = [];
  for (let i=0; i<maxList; i++){
    arrList.push(i);
  }

  if (todayList.length < maxList) {
    for (let i=0; i<=maxList; i++) {
      todayList.push({name: '', id: '0'});
    }
  }
  if (tomorrowList.length < maxList) {
    for (let i=0; i<=maxList; i++) {
      tomorrowList.push({name: '', id: '0'});
    }
  }
  if (thisWeekList.length < maxList) {
    for (let i=0; i<=maxList; i++) {
      thisWeekList.push({name: '', id: '0'});
    }
  }
  if (nextWeekList.length < maxList) {
    for (let i=0; i<=maxList; i++) {
      nextWeekList.push({name: '', id: '0'});
    }
  }
  if (thisMonthList.length < maxList) {
    for (let i=0; i<=maxList; i++) {
      thisMonthList.push({name: '', id: '0'});
    }
  }
  if (laterList.length < maxList) {
    for (let i=0; i<=maxList; i++) {
      laterList.push({name: '', id: '0'});
    }
  }
  if (doneList.length < maxList) {
    for (let i=0; i<=maxList; i++) {
      doneList.push({name: '', id: '0'});
    }
  }
  if (otherList.length < maxList) {
    for (let i=0; i<=maxList; i++) {
      otherList.push({name: '', id: '0'});
    }
  }

  

  const renderedTodolists =  arrList.map((i) =>
    // return (
      <tr key={todayList[i].id}>
        <th key={todayList[i].id+todayList[i].name}><Link href={`/todo/${todayList[i].id}`}>{todayList[i].name}</Link></th>
        <th key={todayList[i].id+todayList[i].name}><Link href={`/todo/${tomorrowList[i].id}`}>{tomorrowList[i].name}</Link></th>
        <th key={todayList[i].id+todayList[i].name}><Link href={`/todo/${thisWeekList[i].id}`}>{thisWeekList[i].name}</Link></th>
        <th key={todayList[i].id+todayList[i].name}><Link href={`/todo/${nextWeekList[i].id}`}>{nextWeekList[i].name}</Link></th>
        <th key={todayList[i].id+todayList[i].name}><Link href={`/todo/${thisMonthList[i].id}`}>{thisMonthList[i].name}</Link></th>
        <th key={todayList[i].id+todayList[i].name}><Link href={`/todo/${laterList[i].id}`}>{laterList[i].name}</Link></th>
        <th key={todayList[i].id+todayList[i].name}><Link href={`/todo/${doneList[i].id}`}>{doneList[i].name}</Link></th>
        <th key={todayList[i].id+todayList[i].name}><Link href={`/todo/${otherList[i].id}`}>{otherList[i].name}</Link></th>
      </tr>
    )  

  return (
    <div>      
      {/* <Header/>  */}
      <ImgFondo/>
      <div className="relative top-5">
        <div>
          <table className='bg-white'>
            <thead className="head-table">
              <tr>
                <th className="font-bold m-5 p-3 text-lg">Today</th>
                <th className="font-bold m-5 p-3 text-lg">Tomorrow</th>
                <th className="font-bold m-5 p-3 text-lg">This Week</th>
                <th className="font-bold m-5 p-3 text-lg">Next Week</th>
                <th className="font-bold m-5 p-3 text-lg">This Month</th>
                <th className="font-bold m-5 p-3 text-lg">Later</th>
                <th className="font-bold m-5 p-3 text-lg">Done</th>
                <th className="font-bold m-5 p-3 text-lg">Other</th>
              </tr>
            </thead>
            <tbody className="relative bg-white ">
              {renderedTodolists}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}