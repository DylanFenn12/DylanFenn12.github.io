-- MIDI_TRANSFER
reaper.gmem_attach("MIDI_TRANSFER")
reaper.gmem_write(0, 0)

function Main()
  Data = reaper.gmem_read(0)
  if Data > 0 then
    reaper.Main_OnCommand(1008, 0) -- Transport: Pause
    return
  end
  reaper.defer(Main)
end

reaper.defer(Main)
