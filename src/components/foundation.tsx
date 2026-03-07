import { ColorPaletteSection } from "./foundation/color-palette"
import { TypographySection } from "./foundation/typography"
import { SpacingSection } from "./foundation/spacing"
import { BorderRadiusSection } from "./foundation/border-radius"
import { GridSystemSection } from "./foundation/grid-systems"

export function FoundationDoc() {
  return (
    <div>
      <ColorPaletteSection />
      <TypographySection />
      <SpacingSection />
      <BorderRadiusSection />
      <GridSystemSection />
    </div>
  )
}
