echo -e "host=github.com\nprotocol=https\n" | git credential-osxkeychain erase
git config --unset-all --global user.name
git config --unset-all --global user.email
git config --global user.email 'tsaohucn@gmail.com'
git config --global user.name 'tsaohucn'
git config user.name
git config user.email