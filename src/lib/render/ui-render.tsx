const SIZE = 24;

export function UiRender({ countRender }: { countRender: number }) {
  return (
    <div
      style={{
        background: "lightblue",
        borderRadius: 10,
        width: SIZE,
        height: SIZE,
        color: "black",
        textAlign: "center",
        position: "absolute",
        right: -SIZE - 10,
        top: 0,
      }}
    >
      {countRender}
    </div>
  );
}
