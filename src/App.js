import React, { useState, useEffect } from 'react';
import './App.scss';
import service from './service/service';
import Subscruber from './components/Subscriber/Subscruber';
import Form from './components/Form/Form';
import Popup from './components/Popup/Popup';

const App = ({data}) => {
	const [initialData, setInitialData] = useState(data); // сохранение данных в состояние
	const [search, setSearch] = useState(''); 
	const [openPop, setOpenPop] = useState(false);
	const [dataPop, setDataPop] = useState(null);

	const mainData = initialData.filter(user => user.name.includes(search)); // фильтр для поиска

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
	}, [initialData]); // если данных нет, то получем их с сервера
    
	const handleData = (id) => () =>{
		// открытие окна для изменения данных и передача их компоненту
		setOpenPop(true);
		setDataPop(mainData[id]);
	};

	const handleSearch = (e) =>{
		setSearch(e.target.value);
	};

	const handleUser = (obj) => (e) => {
		// обработка данных формы после отправки
		e.preventDefault();
		const target = e.target;
		const newObj = {...obj};
        
		// незаполненны пропускаем
		for (const key in obj) {
			if (target[key]) {
				if (target[key].value !== '') {
					newObj[key] = target[key].value;
				}
			}
		}
		// console.log(newObj);
		// заменяем старрые данные в массиве
		const newData = initialData.map(data => data.id !== newObj.id ? data : newObj);
		setInitialData(newData);
		onClose();
		// сохраняем новую копию в локальное хранилище
		localStorage.setItem('data', JSON.stringify(newData));
	};

	const onClose = () => { // закрытие окна
		setOpenPop(false);
	};
    
	let firstLetter;
	// рендер всех пользователей
	const renderSubs = () => mainData.map((sub, index) => {
		// проверка нужно ли делать ограничение
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
