-- MIDI_TRANSFER
reaper.gmem_attach("MIDI_TRANSFER")

function Main()
  local Data = reaper.gmem_read(0)
  if Data > 0 then
    reaper.Main_OnCommand(1008, 0) -- Transport: Pause
    reaper.gmem_write(0, 0) -- Reset the shared memory slot to prevent repeated triggering
  end
  reaper.defer(Main) -- Schedule the Main function to run again
end

reaper.defer(Main) -- Initial call to start the loop
