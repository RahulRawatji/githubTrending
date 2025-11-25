function ListItem({ data }) {

    return <li className="py-2 px-1 border my-2">
        <span className="font-semibold font-mono">{data.name}</span>
        <p>{data.description}</p>
    </li>
}

export default ListItem