interface ListPorps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const List = <T,>({ items, renderItem }: ListPorps<T>) => {
  return (
    <ul>
      {items.map((item) => {
        return renderItem(item);
      })}
    </ul>
  );
};

//Here this render item we already defiend that should be JSX// <span> <p> 
