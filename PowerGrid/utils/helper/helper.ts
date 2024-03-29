const skipedColumns = [
	"@odata.etag",
	"_owningbusinessunit_value",
	"statecode",
	"statuscode",
	"_createdby_value",
	"_ownerid_value",
	"modifiedon",
	"importsequencenumber",
	"overriddencreatedon",
	"utcconversiontimezonecode",
	"timezoneruleversionnumber",
	"versionnumber",
	"partitionid",
	"ttlinseconds"
];
debugger
export const getColumns = (object: Object, data: Array<any>) => {
	if (object) {
		const keys = Object.keys(object);
		const fKeys = [] as any;

		keys.forEach(i => {
			if (!skipedColumns.includes(i)) {
				const displayName = data?.find(d => {
					return d.LogicalName.toLowerCase() === i.toLowerCase();
				})
				if (displayName) {
					if (displayName.AttributeType !== "Memo") {
						fKeys.push(i);
					}
				}
			}
		})
		return fKeys;
	}
}

export const getDispayName = (column: string, data: Array<any>) => {
	if (data.length > 0) {
		const displayName = data.find(i => {
			return i.SchemaName.toLowerCase() === column.toLowerCase();
		})
		if (displayName) {
			return displayName.DisplayName.LocalizedLabels[0].Label
		}
	}
	return "";
}

export const getUniqueIdentifier = (data: Array<any>) => {
	if (data.length > 0) {
		const identifier = data.find(i => {
			return i.AttributeType === "Uniqueidentifier";
		})
		return identifier;
	}
	return "";
}
