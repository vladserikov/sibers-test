import React, { useState, useEffect } from 'react';
import './App.scss';
import service from './service/service';
import Subscruber from './components/Subscriber/Subscruber';
import Form from './components/Form/Form';
import Popup from './components/Popup/Popup';

const App = ({data}) => {
	const [initialData, setInitialData] = useState(data);
	const [search, setSearch] = useState('');
	const [openPop, setOpenPop] = useState(false);
	const [dataPop, setDataPop] = useState(null);

	const mainData = initialData.filter(user => user.name.includes(search));

	useEffect(() => {
		if (initialData.length === 0) {
			console.log('request data');
			service.requestData()
				.then(req => {
					const resData = req.sort((a, b) => a.name > b.name ? 1 : -1);
					setInitialData(resData);
					localStorage.setItem('data', JSON.stringify(resData));
				});
		}
	}, [initialData]);
    
	const handleData = (id) => () =>{
		setOpenPop(true);
		setDataPop(mainData[id]);
	};

	const handleSearch = (e) =>{
		setSearch(e.target.value);
	};

	const handleUser= (obj) => (e) => {
		e.preventDefault();
		const target = e.target;
		const newObj = {...obj};

		for (const key in obj) {
			if (target[key]) {
				if (target[key].value !== '') {
					newObj[key] = target[key].value;
				}
			}
		}
		console.log(newObj);
		const newData = initialData.map(data => data.id !== newObj.id ? data : newObj);
		setInitialData(newData);
		onClose();

		localStorage.setItem('data', JSON.stringify(newData));
	};

	const onClose = () => {
		setOpenPop(false);
	};
	let firstLetter;
	const renderSubs = () => mainData.map((sub, index, arr) => {
		const {name} = sub;
		if ((index === 0) || (name[0] !== mainData[index - 1].name[0])) {
			firstLetter = true;
		} else {
			firstLetter = false;
		}
		return <Subscruber data={sub} key={sub.id} onChangeData={handleData(index)} firstLetter={firstLetter}/>;
	});
    
	return (
		<div className='app'>
			<Form 
				value={search} 
				onChange={handleSearch}
			/>
			<div className="subscribers">
				{renderSubs()}
			</div>
			{openPop ? <Popup data={dataPop} onClose={onClose} onSubmit={handleUser}/> : null}
		</div>
	);
};

export default App;
