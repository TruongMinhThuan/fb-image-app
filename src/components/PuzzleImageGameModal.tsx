import React, { useState, useEffect } from "react";
import Square from "./Square";
import { useLocation, useParams } from "react-router-dom";
import { Button, Flex, Modal, Space } from "antd";
import useStore from "../store";

interface PuzzleImageGameProps {
  image_url?: string;
  is_open?: boolean;
}

export default function PuzzleImageGame(props: PuzzleImageGameProps) {
  const [board_values, setBoard_values] = useState([1, 2, 3, 4, 5, 6, 7, 8, 0]);
  const [win_state, setWin_state] = useState(0);
  const { togglePuzzle } = useStore((state) => state);

  const IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/6/63/Icon_Bird_512x512.png";

  // const { state } = useLocation();

  useEffect(() => {
    if (
      JSON.stringify(board_values) ===
      JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 0])
    ) {
      setWin_state(1);
    } else {
      setWin_state(0);
    }
  }, [board_values]);

  useEffect(() => {

    // handleShuffleClick()
    handleWinPuzzle()
  }, []);


  function handleClick(num: number) {
    const num_idx = board_values.indexOf(num);
    const num_row = parseInt(String(num_idx / 3));
    const num_col = num_idx % 3;
    const zero_idx = board_values.indexOf(0);
    const zero_row = parseInt(String(zero_idx / 3));
    const zero_col = zero_idx % 3;
    const differ = Math.abs(num_row - zero_row) + Math.abs(num_col - zero_col);
    if (differ === 1) {
      let board_values_copy = Array.from(board_values);
      [board_values_copy[num_idx], board_values_copy[zero_idx]] = [
        board_values_copy[zero_idx],
        board_values_copy[num_idx]
      ];
      setBoard_values(board_values_copy);
    }
  }

  function handleShuffleClick() {
    let num_array = [1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = num_array.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [num_array[randomIndex], num_array[i]] = [
        num_array[i],
        num_array[randomIndex]
      ];
    }
    num_array.push(0);
    setBoard_values(num_array);
  }

  const handleWinPuzzle = () => {
    setBoard_values([1, 2, 3, 4, 5, 6, 7, 8, 0]);
  }

  const closePuzzle = () => {
    togglePuzzle(false)
  }

  return (
    <Modal
      centered
      open={props.is_open}
      onOk={closePuzzle}
      onCancel={closePuzzle}
      closeIcon={false}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      okButtonProps={{
        style: {
          display: 'none',
        },
      }}
      cancelButtonProps={{
        style: {
          display: 'none',
        },
      }}
    >

      <Space style={{ paddingTop: 10, paddingBlock: 80 }}>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            alignSelf: "center",

          }}
        >
          <div className="board" style={{ paddingTop: 20 }}>
            {board_values.map((x, index) => (
              <Square
                num={x} key={index}
                handleClick={() => handleClick(x)}
                image_url={props.image_url || "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/f849d585-f3a0-40ea-8ddc-254d83603ca9/width=752,quality=90/193645_00001_.jpeg"}
              />

            ))}
          </div>
          {/* <button className="shuffle" onClick={handleShuffleClick}>
        {" "}
        Shuffle
      </button> */}
          <div>
            {win_state === 1 ? (
              <h1 style={{ color: "green" }}>
                Happy! You have solved the puzzle! Let's share it!
              </h1>
            ) : (
              <h1 style={{ color: "red" }}>Keep Trying!</h1>
            )}
          </div>

          {/* <Button onClick={handleWinPuzzle}>Win</Button> */}
          <Button onClick={handleShuffleClick}>Share</Button>
        </div>
      </Space>
    </Modal>
  );
}
