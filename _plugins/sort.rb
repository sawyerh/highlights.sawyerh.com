module Jekyll
  module CustomSortFilter
    def custom_sort(input, property = nil)
      ary = Liquid::StandardFilters::InputIterator.new(input)
      if ary.first.respond_to?(:[]) && !ary.first[property].nil?
        ary.sort do |a, b|
          a = a[property].to_s
          b = b[property].to_s

          # If the property is an int, let's compare the number value
          # rather than string
          if a.to_i.to_s == a
            a = a.to_i
            b = b.to_i
          end

          if a && b
            a <=> b
          else
            a ? -1 : 1
          end
        end
      else
        input
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::CustomSortFilter)