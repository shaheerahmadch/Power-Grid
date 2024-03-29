import * as React from 'react'
import { Props } from '../types/ComponentProps.s'
import { getColumns, getDispayName, getUniqueIdentifier } from '../utils/helper/helper';

const Component = ({ context, onClick }: Props) => {
	const [columns, setColumns] = React.useState<Array<string>>([]);
	const [data, setData] = React.useState<Array<object>>([]);
	const [metaData, setmetaData] = React.useState<Array<object>>([]);

	React.useEffect(() => {
		(async () => {
			try {
				// var myHeaders = new Headers();
				// myHeaders.append("Content-Type", "application/json");
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				myHeaders.append("Cookie", "ARRAffinity=746146f9b8a568138e0f8e8d19178ca6868557dc4149a92ed430f901c8a2c233; ARRAffinitySameSite=746146f9b8a568138e0f8e8d19178ca6868557dc4149a92ed430f901c8a2c233");

				const raw = JSON.stringify({
					"TableSchemaName": context.parameters.TableSchemaName.raw,
					"TableLogicalName": context.parameters.TableLogicalName.raw
				});

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch(context.parameters.url.raw as string, {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				})
					.then((response) => response.json())
					.then((result) => {
						if (result.rows && result.metadata) {
							if (result.rows.length > 0 && result.metadata.length > 0) {
								const columns = getColumns(result.rows[0], result.metadata) as Array<string>;
								setColumns([...columns]);
								setData([...result.rows])
								setmetaData([...result.metadata]);
							}
						}
					})
					.catch((error) => {
						debugger
					});
			} catch (e) {
				console.error({ e })
			}
		})()
	}, [])

	return (
		<>
			<table className='table'>
				<tr>
					{
						columns && columns.map((i) => {
							const displayName = getDispayName(i, metaData) as string;
							return <><th className='th'>{displayName}</th></>
						})
					}
				</tr>
				{
					data && data.map((d) => {
						return (<>
							<tr className='curser-pointer' onClick={
								() => {
									const item = getUniqueIdentifier(metaData);
									//@ts-ignore
									onClick(d[item.LogicalName.toLowerCase()]);
								}
							}>
								{
									columns && columns.map((c) => {
										return <><td className='td'>{
											//@ts-ignore
											d[c]
										}</td></>
									})
								}
							</tr>
						</>)
					})
				}
			</table>
		</>
	)
}

export default Component