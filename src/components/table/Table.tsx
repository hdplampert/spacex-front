
import "./Table.css";

interface Props {
  headers: string[];
  rows: (string | Function | undefined)[][];
}

export function Table(props: Props) {

  const { headers, rows } = props;
  return(
    <table className="Table">
      <thead>
        <tr>
          {headers.map(header => <th>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => 
          <tr>
            {row.map(cell => 
              <td>
                {cell && (typeof cell == "string" ? cell : cell())}
              </td>)}
          </tr>
        )}
      </tbody>
    </table>
  );

}
