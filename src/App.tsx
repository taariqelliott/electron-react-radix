import { MoonIcon, RocketIcon, SunIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Flex,
  Text,
  TextField,
  Theme,
} from "@radix-ui/themes";
import { KeyboardEvent, useEffect, useState } from "react";

const defaultPlaylistPath =
  "playlist?list=PLrqfjuuSrioScDXZuD1Lxn4uRwf5Eawne&si=4ifrY_Epi5xwf5tk";

enum AccentColor {
  gray = "gray",
  gold = "gold",
  bronze = "bronze",
  brown = "brown",
  yellow = "yellow",
  amber = "amber",
  orange = "orange",
  tomato = "tomato",
  red = "red",
  ruby = "ruby",
  crimson = "crimson",
  pink = "pink",
  plum = "plum",
  purple = "purple",
  violet = "violet",
  iris = "iris",
  indigo = "indigo",
  blue = "blue",
  cyan = "cyan",
  teal = "teal",
  jade = "jade",
  green = "green",
  grass = "grass",
  lime = "lime",
  mint = "mint",
  sky = "sky",
}

const accentColorHexMap = {
  gray: "#696e77",
  gold: "#978365",
  bronze: "#a18072",
  brown: "#ad7f58",
  yellow: "#ffea00",
  amber: "#ffc100",
  orange: "#f66b15",
  tomato: "#e54d2e",
  red: "#e5484d",
  ruby: "#e54566",
  crimson: "#e93d82",
  pink: "#d6409f",
  plum: "#ab4abb",
  purple: "#8e4ec6",
  violet: "#6e56cf",
  iris: "#5b5bd6",
  indigo: "#3e63dd",
  blue: "#0090ff",
  cyan: "#01a2c7",
  teal: "#14a494",
  jade: "#27a383",
  green: "#30a46c",
  grass: "#46a758",
  lime: "#bdee63",
  mint: "#86ead4",
  sky: "#7ce2fe",
};

export default function App() {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [playlistEmbedPath, setPlaylistEmbedPath] =
    useState<string>(defaultPlaylistPath);
  const [themeAppearance, setThemeAppearance] = useState<"dark" | "light">(
    "dark"
  );
  const accentColorOptions: AccentColor[] = Object.values(AccentColor);
  const randomColorAccent: AccentColor =
    accentColorOptions[Math.floor(Math.random() * accentColorOptions.length)];
  const [accentColor, setAccentColor] = useState<AccentColor>(
    AccentColor[randomColorAccent]
  );

  const [iconColorHex, setIconColorHex] = useState<string>(
    accentColorHexMap[randomColorAccent]
  );

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  const extractYouTubeEmbedPath = (url: string): string => {
    return url.split(".com/")[1];
  };

  const handlePlaylistInput = (event: KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (event.key === "Enter") {
      if (target.value.trim() === "") {
        alert("Warning!\n\nEnter a valid link");
        return;
      }
      const embeddedPath = extractYouTubeEmbedPath(target.value);
      setPlaylistEmbedPath(embeddedPath);
      target.value = "";
      target.blur();
    }
  };

  const handleAccentColorChange = (color: AccentColor) => {
    setAccentColor(color);
    setIconColorHex(accentColorHexMap[color]);
  };

  const toggleThemeAppearance = () => {
    setThemeAppearance((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Theme
      panelBackground="translucent"
      grayColor="auto"
      hasBackground={true}
      accentColor={accentColor}
      appearance={themeAppearance}
    >
      <Flex position="absolute" right="1" top="1">
        <Button
          color={accentColor}
          variant="classic"
          radius="large"
          onClick={toggleThemeAppearance}
        >
          <Flex className="cursor-pointer">
            {themeAppearance === "dark" ? (
              <MoonIcon width="40" />
            ) : (
              <SunIcon width="40" />
            )}
          </Flex>
        </Button>
      </Flex>

      <Flex
        align="center"
        justify="center"
        direction="column"
        height="100dvh"
        gap="2"
      >
        <Flex direction="column" width="60%">
          <Flex align="center" justify="center" gap="2">
            <RocketIcon color={iconColorHex} />
            <Text className="font-mono" color={accentColor} htmlFor="url-input">
              Night Zoo
            </Text>
            <RocketIcon color={iconColorHex} />
          </Flex>
          <Flex direction="column" gap="3">
            <Box maxWidth="100%">
              <TextField.Root
                id="url-input"
                name="url-input"
                color={accentColor}
                variant="soft"
                onKeyDown={handlePlaylistInput}
                size="3"
                placeholder="Enter a playlist URL…"
              />
            </Box>
          </Flex>
        </Flex>

        <Card m="5px">
          <iframe
            width={windowWidth / 2}
            height={windowHeight / 2}
            src={`https://www.youtube.com/embed/${playlistEmbedPath}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </Card>

        <Flex
          direction="row"
          gap="2"
          wrap="wrap"
          align="center"
          justify="center"
          width="50%"
        >
          {accentColorOptions.map((color) => (
            <Button
              key={color}
              variant={accentColor === color ? "classic" : "outline"}
              onClick={() => handleAccentColorChange(color)}
              color={color}
            >
              <Flex
                className="cursor-pointer"
                width="100px"
                align="center"
                justify="center"
              >
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </Flex>
            </Button>
          ))}
        </Flex>
      </Flex>
    </Theme>
  );
}
