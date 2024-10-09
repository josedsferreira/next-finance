"use client";

import dynamic from 'next/dynamic';
//import '@/app/lib/springData'
import 'chart.js/auto';
import { useState, useEffect } from 'react';

/* const APIdataset = [
	{"entry_month": "Nov-20", "amount": 7972},
	{"entry_month": "Dec-20", "amount": 7990},
	{"entry_month": "Jan-21", "amount": 8258},
	{"entry_month": "Feb-21", "amount": 8774},
	{"entry_month": "Mar-21", "amount": 8880},
	{"entry_month": "Apr-21", "amount": 9224},
	{"entry_month": "May-21", "amount": 8979},
	{"entry_month": "Jun-21", "amount": 10142},
	{"entry_month": "Jul-21", "amount": 10548},
	{"entry_month": "Aug-21", "amount": 11157},
	{"entry_month": "Sep-21", "amount": 11976},
	{"entry_month": "Oct-21", "amount": 9014},
	{"entry_month": "Nov-21", "amount": 9694},
	{"entry_month": "Dec-21", "amount": 11667},
	{"entry_month": "Jan-22", "amount": 12428},
	{"entry_month": "Feb-22", "amount": 12895},
	{"entry_month": "Mar-22", "amount": 13326},
	{"entry_month": "Apr-22", "amount": 13702},
	{"entry_month": "May-22", "amount": 14812},
	{"entry_month": "Jun-22", "amount": 15125},
	{"entry_month": "Jul-22", "amount": 15652},
	{"entry_month": "Aug-22", "amount": 15267},
	{"entry_month": "Sep-22", "amount": 11910},
	{"entry_month": "Oct-22", "amount": 12210},
	{"entry_month": "Nov-22", "amount": 12620},
	{"entry_month": "Dec-22", "amount": 12666},
	{"entry_month": "Jan-23", "amount": 12368},
	{"entry_month": "Feb-23", "amount": 12254},
	{"entry_month": "Mar-23", "amount": 12107},
	{"entry_month": "Apr-23", "amount": 11815},
	{"entry_month": "May-23", "amount": 11704},
	{"entry_month": "Jun-23", "amount": 11533},
	{"entry_month": "Jul-23", "amount": 11355},
	{"entry_month": "Aug-23", "amount": 10637},
	{"entry_month": "Sep-23", "amount": 6708},
	{"entry_month": "Oct-23", "amount": 6413},
	{"entry_month": "Nov-23", "amount": 6693},
	{"entry_month": "Dec-23", "amount": 6604},
	{"entry_month": "Jan-24", "amount": 6633},
	{"entry_month": "Feb-24", "amount": 6507},
	{"entry_month": "Mar-24", "amount": 6301},
	{"entry_month": "Apr-24", "amount": 5880},
	{"entry_month": "May-24", "amount": 5481},
	{"entry_month": "Jun-24", "amount": 5517},
	{"entry_month": "Jul-24", "amount": 5323},
	{"entry_month": "Aug-24", "amount": 5076},
	{"entry_month": "Sep-24", "amount": 4890}
  ]; */

/* //geeks for geeks style
const data = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
	{
	  label: 'GeeksforGeeks Line Chart',
	  data: [65, 59, 80, 81, 56],
	  fill: false,
	  borderColor: 'rgb(75, 192, 192)',
	  tension: 0.1,
	},
  ],
}; */

export default function BalanceChart() {

	interface Balance {
		id: number;
		amount: number;
		balanceYear: number;
		balanceMonth: number;
	}

	const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
		ssr: false,
	});
	  
	const [balances, setBalances] = useState<Balance[] | null>(null);
	  
	useEffect(() => {
		  async function fetchBalances() {
			  let response = await fetch('http://localhost:8080/api/balances')
			  let data = await response.json()
			  setBalances(data)
		  }
		  fetchBalances()
	}, []);

	if (!balances) return <div>No balance data available</div>

	console.log(balances)
	
	const data = {
		labels: balances.map(row => String(row.balanceMonth) + "/" + String(row.balanceYear)),
		datasets: [
			{
				label: "Balance",
				data: balances.map(row => row.amount)
			}
		]
	}

	return (
		<div style={{ width: '700px', height: '700px' }}>
		  <h1>Finance Chart</h1>
		  <Line data={data} />
		</div>
	  );
};
