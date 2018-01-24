import { render, version } from 'inferno';
import Component from 'inferno-component';
import { Incrementer } from './components/Incrementer';
import { MessagePortService } from './services/messageport.service';
import './main.scss'

const container = document.getElementById('app');

class MyComponent extends Component<any, any> {
	private tsxVersion: number;

	public list: number[] = [1, 2, 3, 4, 5];

	constructor(props, context) {
		super(props, context);

		this.tsxVersion = 2.34; /* This is typed value */
		const myClassInstance = MessagePortService.Instance;
		console.log(myClassInstance.value);
	}

	public render() {
		return (
			<div>
				<h1>{`Welcome to Inferno ${version} TSX ${this.tsxVersion}`}</h1>
				{this.list.map((obj, ind) => {
					return <Incrementer name={'Crazy button'} />
				})}
			</div>
		);
	}
}

render(<MyComponent />, container);
